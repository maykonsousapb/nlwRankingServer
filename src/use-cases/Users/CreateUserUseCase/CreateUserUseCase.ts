import axios from "axios";
import { inject, injectable } from "tsyringe";
import { IDataUserModel, IUserCreateData, IUsersRepository } from "../../../repositories/UsersRepository";


@injectable()
export class CreateUserUseCase {
  constructor( 
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ){}

  async execute({username}: IUserCreateData): Promise<IDataUserModel> {
    
    if(!username) throw new Error("Username is required");
    
    const userAlreadyExists = 
    await this.usersRepository.getByUsername(username) 

    const url = `https://skylab-api.rocketseat.com.br/public/event/nlw-copa/referral/${username}`
      
    const  userIsValid = await axios.get(url).then(response => response.data.totalCount).catch(() => null);
    
    if(userAlreadyExists) throw new Error("User already exists");
    if(!userIsValid) throw new Error("User is not valid");


    const user = await this.usersRepository.create({
      username, 
      });
    return user;
}
}