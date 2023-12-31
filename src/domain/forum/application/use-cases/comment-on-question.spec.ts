
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeQuestion } from "test/factories/make-question";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionAttachmentsRepository :InMemoryQuestionAttachmentsRepository
let inMemoryQuestionCommentRepository :InMemoryQuestionCommentsRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut : CommentOnQuestionUseCase

describe('Comment on Question', async ()=>{
  beforeEach( async()=>{
     inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionCommentRepository  = new InMemoryQuestionCommentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository)
    sut = new CommentOnQuestionUseCase(inMemoryQuestionRepository, inMemoryQuestionCommentRepository)
  })
  it ('Should be able to comment on question',async ()=>{
     const question = makeQuestion()    
    await inMemoryQuestionRepository.create(question)   
     
    await sut.execute({
      questionId:question.id.toString(),
      authorId:question.authorId.toString(),
      content:'test content'
    })
    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual('test content') 
  })
  it('should throw if question not exists ', async()=>{
    const question= makeQuestion({},
      new UniqueEntityID('question-id')
      )   
    await inMemoryQuestionRepository.create(question)
  

   const result = await  sut.execute({
        questionId:'question-false-id',
        authorId:question.authorId.toString(),
        content:question.content
      })
   
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  }) 


})