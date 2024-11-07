from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import feedManager
from openAiApi import OpenAIAPI

app = FastAPI()
openai_api = OpenAIAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FeedRequest(BaseModel):
    urls: List[str]

@app.post("/get_summary")
async def get_summary(feed_request: FeedRequest):
    """
    Endpoint to fetch and summarize RSS feeds
    """
    if not feed_request.urls:
        raise HTTPException(status_code=400, detail="No feed URLs provided")
        
    # Get feed data
    feed_data = feedManager.getFeedData(feed_request.urls)
    
    if not feed_data:
        raise HTTPException(status_code=404, detail="No feed data found")
        
    # Generate summary
    response = openai_api.generate_summary(feed_data)
    
    if response["status"] == "failed":
        raise HTTPException(status_code=500, detail=response["message"])
        
    return {"summary": response["summary"]}


# Example usage for testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)