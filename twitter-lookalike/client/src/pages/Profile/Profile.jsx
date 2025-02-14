




import React, { useState, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import EditProfile from "../../components/EditProfile/EditProfile";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";


import { following } from "../../redux/userSlice";
import ProfileTweet from "../../components/ProfileTweet/ProfileTweet";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const backend_url = "https://twitter5610-backend.herokuapp.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(backend_url+`/tasks/${id}`);
        const userProfile = await axios.get(backend_url+`/find/${id}`);
        console.log(userTweets);
        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);

  // const handleFollow = async () => {
  //   if (!currentUser.following.includes(id)) {
  //     try {
  //       const follow = await axios.put(backend_url+`/follow/${id}`, {
  //         id: currentUser.user._id,
  //       });
  //       dispatch(following(id));
  //     } catch (err) {
  //       console.log("error", err);
  //     }
  //   } else {
  //     try {
  //       const unfollow = await axios.put(backend_url+`/unfollow/${id}`, {
  //         id: currentUser.user._id,
  //       });

  //       dispatch(following(id));
  //     } catch (err) {
  //       console.log("error", err);
  //     }
  //   }
  // };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <img
              src={userProfile?.profilePicture}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="mt-6">
            
                    <ProfileTweet  />
                  
          </div>
        </div>

        <div className="px-6">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default Profile;
