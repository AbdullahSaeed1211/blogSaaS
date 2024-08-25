export function calculateReadingTime(articleContent: any): string {
    // Convert articleContent to string if it's not already
    let text: string;
  
    if (typeof articleContent === "string") {
      text = articleContent;
    } else if (typeof articleContent === "object" && articleContent !== null) {
      text = JSON.stringify(articleContent); // Convert JSON or object to string
    } else {
      throw new Error("Unsupported articleContent format");
    }
  
    const wordsPerMinute = 200; // Average reading speed
    const cleanedText = text.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const words = cleanedText.split(/\s+/).length; // Split by spaces to count words
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }
  