const {controller,get,post} =require("./decorator")

@controller('/api/v0/user')
export class userController{
	@get('/')
	async getUser(ctx,next){
		ctx.body={
			data:"dddd"
		}
	} 
}