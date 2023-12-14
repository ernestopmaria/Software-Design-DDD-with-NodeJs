import { QuestionsRepository } from "../repositories/questions-repository"


interface EditQuestionUseCaseRequest{
  questionId: string
  authorId: string 
  title: string
  content: string
}

interface EditQuestionUseCaseResponse{}


export class EditQuestionUseCase{
  constructor(private questionsRepository: QuestionsRepository){}

  async execute({authorId, title, content, questionId}:EditQuestionUseCaseRequest):Promise<EditQuestionUseCaseResponse>{
    const question = await this.questionsRepository.findById(questionId)

    if(!question){
      throw new Error(" Question not found")
    }
    if(authorId !== question.authorId.toString()){
      throw new Error ("Not Allowed.")
          }
    question.title=title,
    question.content=content
     await this.questionsRepository.save(question)

     return {}
  }
  
}