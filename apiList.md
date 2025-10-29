/. **DevTinder APIs**

<!-- authRouter APIs -->
 `POST /signup`
 `POST /login`
 `POST /logout`

<!-- profileRouter APIs -->

 `GET /profile/view`
 `PATCH /profile/edit`
 `PATCH /profile/password`

<!-- connectionRequestRouter APIs -->

 <!-- `POST /request/send/interested/:userId` -->
 `POST /request/send/:status/:userId`          //"ignored", "interested"
 `POST /request/review/:status/:requestId`     // ""accepted", "rejected"
 

<!-- userRouter APIs -->
 `GET user/requests`
 `GET user/connections`
 `GET user/feed` — Gets profiles of other users on the platform



* `ignore`
* `interested`
* `accepted`
* `rejected`
