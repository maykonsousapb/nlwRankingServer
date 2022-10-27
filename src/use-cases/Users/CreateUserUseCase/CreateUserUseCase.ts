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
    if(userAlreadyExists) throw new Error("User already exists");


    const user = await this.usersRepository.create({
      username, 
      });
    return user;
}
}