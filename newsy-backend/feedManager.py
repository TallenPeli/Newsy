import feedparser
import json

def getFeedData(urls=[]):
    prompt = ""

    for url in urls:
        try:
            print(f"Getting data from feed '{url}'")
            feed_data = feedparser.parse(url)
            prompt += "*New Feed Title: *"
            prompt += feed_data["feed"]["title"]
            prompt += "*New Feed URL : *"
            prompt += feed_data["feed"]["link"] + "\n"

            for entry in feed_data["entries"]:
                prompt += entry.description + "\n\n"

        except Exception as e:
            print(f"Unable to get feed '{url}' because of the following error: {e}")
    print("Got all data sucessfully! Yayayy")
    return prompt
