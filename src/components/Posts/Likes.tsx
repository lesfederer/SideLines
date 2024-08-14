import { useState, useEffect } from 'react';
import { useAppwrite } from 'appwrite';

function Post({ postId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const appwrite = useAppwrite();

  useEffect(() => {
    // Fetch initial like count and check if user has liked the post
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
      if (liked) {
        // Remove like (replace with your logic to delete like from Appwrite)
        await removeLike(postId);
      } else {
        // Create like (replace with your logic to create like in Appwrite)
        await createLike(postId);
      }
      setLiked(!liked);
      // Update like count (fetch updated count from Appwrite)
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  return (
    <div>
      {/* Post content */}
      <button onClick={handleLikeClick}>{liked ? 'Unlike' : 'Like'} ({likeCount})</button>
    </div>
  );
}
