/**
 * This script is used to transform the classes in the components to be RTL to fix shadcn rtl support.
 */
import fs from "fs/promises"
import path from "path"

const COMPONANTS_PATH = "src/components"
const RTL_TRANSFORMATIONS = {
	// Spacing and positioning
	"pl-": "ps-",
	"pr-": "pe-",
	"ml-": "ms-",
	"mr-": "me-",
	"left-": "start-",
	"right-": "end-",
	"translate-x-": "translate-x-",
	"space-x-": "space-x-",
	"space-y-": "space-y-",
	"gap-x-": "gap-x-",
	"gap-y-": "gap-y-",
	// Border radius
	"rounded-l-": "rounded-s-",
	"rounded-l ": "rounded-s ",
	"rounded-r ": "rounded-e ",
	"rounded-r-": "rounded-e-",
	"rounded-tl-": "rounded-ts-",
	"rounded-tr-": "rounded-te-",
	"rounded-bl-": "rounded-bs-",
	"rounded-br-": "rounded-be-",
	// Border width
	"border-l ": "border-s ",
	"border-r ": "border-e ",
	"border-l-": "border-s-",
	"border-r-": "border-e-",
	"border-tl-": "border-ts-",
	"border-tr-": "border-te-",
	"border-bl-": "border-bs-",
	"border-br-": "border-be-",
	// Flex and grid
	"justify-start": "justify-start",
	"justify-end": "justify-end",
	"items-start": "items-start",
	"items-end": "items-end",
	// Text alignment
	"text-left": "text-start",
	"text-right": "text-end",
	// Animation specific
	"slide-in-from-left": "slide-in-from-start",
	"slide-in-from-right": "slide-in-from-end",
	"slide-out-to-left": "slide-out-to-start",
	"slide-out-to-right": "slide-out-to-end",
}

const RTL_SPECIFIC_CLASSES = {
	// Add RTL-specific classes
	"rtl:space-x-reverse": "rtl:space-x-reverse",
	"rtl:space-y-reverse": "rtl:space-y-reverse",
	"rtl:translate-x-reverse": "rtl:translate-x-reverse",
	// Animation specific
	"rtl:slide-in-from-start": "rtl:slide-in-from-end",
	"rtl:slide-in-from-end": "rtl:slide-in-from-start",
	"rtl:slide-out-to-start": "rtl:slide-out-to-end",
	"rtl:slide-out-to-end": "rtl:slide-out-to-start",
}

function transformClasses(content: string): string {
	let transformedContent = content

	// Safely transform attribute selectors for data-side (only standalone)
	transformedContent = transformedContent.replace(
		/\\[data-side=(left|right)\\]/g,
		(match, p1) => {
			if (p1 === "left") return "[data-side=start]"
			if (p1 === "right") return "[data-side=end]"
			return match
		},
	)

	// Transform regular classes (excluding attribute selectors)
	Object.entries(RTL_TRANSFORMATIONS).forEach(([oldClass, newClass]) => {
		const regex = new RegExp(`\\b${oldClass}`, "g")
		transformedContent = transformedContent.replace(regex, newClass)
	})

	// Add RTL-specific classes where needed
	Object.entries(RTL_SPECIFIC_CLASSES).forEach(([rtlClass]) => {
		if (transformedContent.includes(rtlClass)) {
			transformedContent = transformedContent.replace(
				new RegExp(`\\b${rtlClass}\\b`, "g"),
				`${rtlClass}`,
			)
		}
	})

	return transformedContent
}

async function processFile(filePath: string) {
	try {
		const content = await fs.readFile(filePath, "utf-8")
		const transformedContent = transformClasses(content)

		// Only write if content actually changed
		if (content !== transformedContent) {
			await fs.writeFile(filePath, transformedContent)
			console.log(`✅ Updated: ${filePath}`)
			return true
		}

		console.log(`🔄 No changes needed: ${filePath}`)
		return false
	} catch (error) {
		console.error(`❌ Error processing ${filePath}:`, error)
		return false
	}
}

async function findFiles(dir: string, pattern: RegExp): Promise<string[]> {
	const files: string[] = []
	const entries = await fs.readdir(dir, { withFileTypes: true })

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name)
		if (entry.isDirectory()) {
			files.push(...(await findFiles(fullPath, pattern)))
		} else if (entry.isFile() && pattern.test(entry.name)) {
			files.push(fullPath)
		}
	}

	return files
}

async function main() {
	const componentsDir = path.join(process.cwd(), COMPONANTS_PATH)
	const files = await findFiles(componentsDir, /\.(tsx)$/)

	console.log("🚀 Starting RTL transformation...")
	console.log(`📁 Found ${files.length} files to process`)

	let updatedFiles = 0
	for (const file of files) {
		const wasUpdated = await processFile(file)
		if (wasUpdated) updatedFiles++
	}

	console.log("\n📊 Summary:")
	console.log(`Total files processed: ${files.length}`)
	console.log(`Files updated: ${updatedFiles}`)
	console.log(`Files unchanged: ${files.length - updatedFiles}`)
	console.log("\n✨ RTL transformation completed!")
}

main().catch(console.error)
