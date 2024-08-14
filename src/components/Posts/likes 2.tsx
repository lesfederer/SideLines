import { useState, useEffect } from 'react';
import { useAppwrite } from 'appwrite';

function Post({ postId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const appwrite = useAppwrite();

  useEffect(() => {
    // Fetch initial like data
    const fetchLikeData = async () => {
      try {
        // Replace with your actual logic to fetch like count and user's like status
        const likeCountResponse = await appwrite.database.listDocuments('likes', [
          Index('postId', '==', postId),
        ]);
        setLikeCount(likeCountResponse.total);

        // Check if user has liked the post (replace with your logic)
        const userHasLiked = await checkUserLikedPost(postId);
        setLiked(userHasLiked);
      } catch (error) {
        console.error('Error fetching like data:', error);
      }
    };

    fetchLikeData();
  }, [postId, appwrite]);

  const handleLikeClick = async () => {
    try {
      setLiked(!liked);
      if (liked) {
        // Remove like (replace with your logic to delete like from Appwrite)
        await appwrite.database.deleteDocument('likes', `like-${postId}-${userId}`); // Replace with your like document ID generation logic
      } else {
        // Create like (replace with your logic to create like in Appwrite)
        await appwrite.database.createDocument('likes', 'unique()', { postId, userId });
      }
      // Update like count (fetch updated count from Appwrite)
      const likeCountResponse = await appwrite.database.listDocuments('likes', [
        Index('postId', '==', postId),
      ]);
      setLikeCount(likeCountResponse.total);
    } catch (error) {
      console.error('Error handling like:', error);
      // Handle error, e.g., revert like state, show error message
    }
  };

  return (
    <div>
      {/* Post content */}
      <button onClick={handleLikeClick}>{liked ? 'Unlike' : 'Like'} ({likeCount})</button>
    </div>
  );
}
