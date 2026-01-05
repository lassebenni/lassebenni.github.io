import sys
import re
import os
from md_utils import extract_metadata
import google.generativeai as genai

# Configure Gemini
# Note: In a real environment, you should load the API key from environment variables.
# The user might have it set up in their shell or .env file.
# We'll assume typical setup or user needs to provide it.
try:
    if "GEMINI_API_KEY" in os.environ:
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
except Exception as e:
    print(f"Warning: GEMINI_API_KEY not found or configuration failed: {e}")

def generate_summary(text):
    """
    Generates a 1-sentence summary of the text using Gemini.
    """
    if not os.environ.get("GEMINI_API_KEY"):
        return "AI Summary: (API Key missing) " + text[:50] + "..."

    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"Summarize the following text into a single, concise sentence that captures the main value or insight. Start with 'AI Summary: '. Text: {text}"
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Error generating summary: {e}")
        return "AI Summary generation failed."

def process_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Regex to find accordion shortcodes
    # We look for {{% accordion ... %}} ... {{% /accordion %}}
    # We need to capture the opening tag attributes and the inner content
    # Note: Regex for nested shortcodes or complex markdown can be tricky, 
    # but for this specific "accordion" usage it should be straightforward.
    
    # Pattern explanation:
    # {{% accordion (params) %}} (content) {{% /accordion %}}
    # We use non-greedy matching .*? for params and content.
    # formatting: 's' flag (dot matches newline) is needed.
    
    pattern = re.compile(r'{{% accordion\s+(.*?)%}}(.*?){{% /accordion %}}', re.DOTALL)
    
    def replacer(match):
        params_str = match.group(1)
        inner_content = match.group(2)
        
        # Check if 'summary=' is already present
        if 'summary="' in params_str:
            print("Skipping accordion, summary already present.")
            return match.group(0) # Return unchanged
        
        # Generate summary from inner content
        # Strip simple image tags or links to get text for summarization? 
        # For now, we pass raw markdown to LLM, it usually handles it well.
        summary_text = generate_summary(inner_content[:2000]) # Limit context window to 2000 chars
        
        # Clean up summary text (remove newlines, double quotes)
        summary_text = summary_text.replace('"', "'").replace('\n', ' ')
        
        # Add summary param to opening tag
        # We assume params_str ends with just space or nothing before %}}
        # But we must be careful not to break syntax.
        # usually params are like: title="x" level="3"
        
        new_params = f'{params_str.strip()} summary="{summary_text}" '
        
        return f'{{{{% accordion {new_params}%}}}}{inner_content}{{{{% /accordion %}}}}'

    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path} with accordion summaries.")
    else:
        print(f"No changes made to {file_path}.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/generate_accordion_summaries.py <file_path>")
        sys.exit(1)
    
    process_file(sys.argv[1])
