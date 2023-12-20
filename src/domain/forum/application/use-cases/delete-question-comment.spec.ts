
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'


let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('delete a questioncomment by id', async () => {
  beforeEach( async () => {
     inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository(),
      sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })
  it('it should be able to delete a question comment', async () => {

    const newQuestionComment = makeQuestionComment()
    await inMemoryQuestionCommentRepository.create(newQuestionComment)

 

    await sut.execute({ authorId: newQuestionComment.authorId.toString(), questionCommentId: newQuestionComment.id.toString()})
    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('it should not be able to delete a question comment from another user', async () => {

    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1')
    },
      new UniqueEntityID('questioncomment-1'))

    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    expect(
      () => {
        return sut.execute({
          authorId: 'author-2',
          questionCommentId: 'questioncomment-1'
        })
      }).rejects.toBeInstanceOf(Error)
  })
})
