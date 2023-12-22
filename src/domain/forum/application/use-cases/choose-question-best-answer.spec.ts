import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswer } from "./choose-question-best-answer";
import { makeQuestion } from "test/factories/make-question";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";


let inMemoryAnswerRepository :InMemoryAnswersRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut : ChooseQuestionBestAnswer

describe('Choose Question Best Answer', async ()=>{
  beforeEach( async()=>{
    inMemoryAnswerRepository  = new InMemoryAnswersRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new ChooseQuestionBestAnswer(inMemoryAnswerRepository, inMemoryQuestionRepository)
  })
  it ('Should be able to choose the  question best answer',async ()=>{
    const question= makeQuestion()
    const answer = makeAnswer({
      questionId:question.id
    })
    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId:answer.id.toString(),
      authorId:question.authorId.toString()
    })
    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)   

  })
  it('should not be able to choose another user question best answer', async()=>{
    const question= makeQuestion({
      authorId: new UniqueEntityID('author-1')
    })
    const answer = makeAnswer({
      questionId:question.id
    })    
    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    const result = await sut.execute({
      answerId:answer.id.toString(),
      authorId:'author-2'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })


})