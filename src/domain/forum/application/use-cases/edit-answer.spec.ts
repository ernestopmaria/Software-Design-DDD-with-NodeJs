import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";


let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe(' Edit answer', () => {

  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })


  it(' should be able to update a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
      content: 'Content-1'
    },
      new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
       content: 'Content-1',
      answerId: 'answer-1'
    }
    )
    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
         content: 'Content-1',
    })

  }

  )
  it('it should not be able to update a question from another user', async () => {

    const newQuestion = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
         content: 'Content-1'
    },
      new UniqueEntityID('question-1'))

    await inMemoryAnswerRepository.create(newQuestion)


  const result= await  sut.execute({
          authorId: 'author-2',
         content: 'Content-1',
          answerId: 'question-1'

        })


       
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

})