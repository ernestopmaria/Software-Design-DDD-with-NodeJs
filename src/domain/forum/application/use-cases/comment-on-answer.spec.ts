

import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


let inMemoryAnswerCommentRepository :InMemoryAnswerCommentsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut : CommentOnAnswerUseCase

describe('Comment on Answer', async ()=>{
  beforeEach( async()=>{
    inMemoryAnswerCommentRepository  = new InMemoryAnswerCommentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new CommentOnAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswerCommentRepository)
  })
  it ('Should be able to comment on answer',async ()=>{
     const answer = makeAnswer()    
    await inMemoryAnswerRepository.create(answer)   
     
    await sut.execute({
      answerId:answer.id.toString(),
      authorId:answer.authorId.toString(),
      content:'test content'
    })
    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual('test content') 
  })
  it('should throw if answer not exists ', async()=>{
    const answer= makeAnswer({},
      new UniqueEntityID('answer-id')
      )   
    await inMemoryAnswerRepository.create(answer) 


      const result = await sut.execute({
        answerId:'answer-false-id',
        authorId:answer.authorId.toString(),
        content:answer.content
      })  

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  }) 

})