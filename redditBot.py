#checks for mispelled word ("the") in (25) recent reddit posts on a subreddit (r/test) and alerts incorrect spelling via a comment on the post
import praw
import time

reddit = praw.Reddit(#auth)

words_to_check = ['teh','thee','thw','thr','th'] #mispelled words to find
checked_comments = [] #comments checked (id)

def run_bot():
    subreddit = reddit.subreddit("test") #r/test subreddit
    print("Connected to r/test")
    commentList = subreddit.comments(limit=25) #25 recent comments
    print("Grabbing comments...")
    for comment in commentList:
        comment_text = comment.body.lower() #text body of comment in lowercase
        isMatch= any(string in comment_text for string in words_to_check) #search for any words in comment that matches mispelled words
        if comment.id not in checked_comments and isMatch: #if match and not repeated comment
            print("Match found! Comment ID: " + comment.id)
            comment.reply('I think you meant "the"') #reply
            print("Reply sucessful!")
            checked_comments.append(comment.id) #add comment id to checked_comments 
    print("Finished checking all comments")
        
while True:
    run_bot()
    time.sleep(100)

