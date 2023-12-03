import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository:AnswersRepository={
  async create(answer:Answer):Promise<void>{
  return
  }
}
 
test('create an answer', async ()=>{
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)
  const answer = await answerQuestion.execute({
    questionId:'1',
    instructorId:'1',
    content:'nova resposta'
  })
  expect(answer.content).toEqual('nova resposta')
})