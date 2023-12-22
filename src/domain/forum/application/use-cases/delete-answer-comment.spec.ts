
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { NotAllowedError } from './errors/not-allowed-error'



let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('delete a answercomment by id', async () => {
  beforeEach( async () => {
     inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository(),
      sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })
  it('it should be able to delete a answer comment', async () => {

    const newAnswerComment = makeAnswerComment()
    await inMemoryAnswerCommentRepository.create(newAnswerComment)

 

    await sut.execute({ authorId: newAnswerComment.authorId.toString(), answerCommentId: newAnswerComment.id.toString()})
    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  it('it should not be able to delete a answer comment from another user', async () => {

    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1')
    },
      new UniqueEntityID('answer-comment-1'))

    await inMemoryAnswerCommentRepository.create(newAnswerComment)

    const result = await sut.execute({
      authorId: 'author-2',
      answerCommentId: 'answer-comment-1'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
