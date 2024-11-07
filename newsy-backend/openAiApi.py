from openai import OpenAI
from typing import Dict
import os

class OpenAIAPI:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
    def generate_summary(self, feed_data: str) -> Dict:
        """
        Generates a summary of RSS feeds using OpenAI's API
        Returns the generated summary
        """
        print("sending to OpenAI")
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": """
                        Summarize the key points from these RSS feeds in a well-structured markdown format.
                        For each feed:
                        1. Create a heading with the feed title
                            i.e: ## News Headline

                        2. Provide brief, engaging summaries of key articles
                            i.e: There was something that happened recently that is important

                        3. Include relevant links
                        4. Use markdown formatting for better readability
                        
                        Format example:
                        # Feed Title
                        ### Article Title

                        Article summary here.
                        
                        [Read More](url)
                        ---   

                        always include the "---" between feeds.
                        """
                    },
                    {"role": "user", "content": feed_data}
                ],
                max_tokens=1000
            )
            
            return {
                "status": "success",
                "summary": response.choices[0].message.content
            }
            
        except Exception as e:
            return {
                "status": "failed",
                "message": f"Failed to generate summary: {str(e)}"
            }

