import { Job } from "../decorators/job.decorator";
import { AbstractJob } from "./abstract.job";

@Job({
    name: 'Fibonacci Job',
    description: 'Calculates Fibonacci numbers and store in db'
})
export class FibonacciJob extends AbstractJob {} 