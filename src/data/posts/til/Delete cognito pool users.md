---
title: Delete all cognito users in a pool
summary: Save yourself some time when testing with AWS Cognito
date: "2024-05-29T00:00:00.000-04:00"
slug: delete-cognito-users
tags:
  - til
---

[AWS Cognito](https://aws.amazon.com/cognito/) is an identity service provided by Amazon that integrates with its other AWS services. That's basically the only good thing I can say about it, but you don't always get to choose your tools.

During development and testing, I find I sometimes need to clear out a user pool in a development environment, but AWS doesn't make that easy. So here's a script that uses the `aws` cli and `jq` (which you can get [here](https://github.com/jqlang/jq)) to delete all users within a pool. I'm fairly certain I stole this from a Stack Overflow post originally, so feel free to steal it from me.

```shell
aws cognito-idp list-users --user-pool-id $COGNITO_USER_POOL_ID | jq -r '.Users | .[] | .Username' | xargs -n 1 -P 5 -I % bash -c "echo Deleting %; aws cognito-idp admin-delete-user --user-pool-id $COGNITO_USER_POOL_ID --username %"
```