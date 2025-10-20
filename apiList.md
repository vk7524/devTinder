 **DevTinder APIs**

<!-- authRouter APIs -->
 `POST /signup`
 `POST /login`
 `POST /logout`

<!-- profileRouter APIs -->

 `GET /profile/view`
 `PATCH /profile/edit`
 `PATCH /profile/password`

<!-- connectionRequestRouter APIs -->

 `POST /request/send/interested/:userId`
 `POST /request/send/ignored/:userId`
 `POST /request/review/accepted/:requestId`
 `POST /request/review/rejected/:requestId`

<!-- userRouter APIs -->

 `GET user/connections`
 `GET user/requests/received`
 `GET user/feed` — Gets profiles of other users on the platform



* `ignore`
* `interested`
* `accepted`
* `rejected`
