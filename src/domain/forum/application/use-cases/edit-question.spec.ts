import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { makeQuestionAttachments } from "test/factories/make-question-attachment";
import { NotAllowedError } from "./errors/not-allowed-error";


let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe(' Edit question', () => {

  beforeEach(() => {
  
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository)
    sut = new EditQuestionUseCase(inMemoryQuestionRepository, inMemoryQuestionAttachmentsRepository)
  })


  it(' should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
      title: 'Title-1',
      content: 'Content-1'
    },
      new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)
    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1')
      }),
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('3')
      }))


    await sut.execute({
      authorId: 'author-1',
      title: 'Title-2',
      content: 'Content-1',
      questionId: 'question-1',
      attachmentsIds: ['1', '3']
    }
    )
    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Title-2',
      content: 'Content-1',
    })
    expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
    ])

  }

  )

  it('it should not be able to update a question from another user', async () => {


    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),

    },
      new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      title: 'Title-2',
      content: 'Content-1',
      questionId: 'question-1',
      attachmentsIds: []

    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})