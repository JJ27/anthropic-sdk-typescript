import "dotenv/config";
import { AI_PROMPT, Client, HUMAN_PROMPT } from "../src";

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
    throw new Error("The ANTHROPIC_API_KEY environment variable must be set");
}

const client = new Client(apiKey);

client
    .completeStream(
        {
            prompt: `${HUMAN_PROMPT}The tobacco industry closely monitors all surveys that involve smoking. One survey showed that, among 785 randomly selected subjects who completed 4 years of college, 18.3% smoke. Check all necessary conditions and construct the 99% confidence interval for the true percentage of smokers among all people who completed 4 years of college.${AI_PROMPT}`,
            stop_sequences: [HUMAN_PROMPT],
            max_tokens_to_sample: 500,
            model: "claude-v1",
        },
        {
            onOpen: (response) => {
                console.log("Opened stream, HTTP status code", response.status);
            },
            onUpdate: (completion) => {
                console.log(completion.completion);
            },
        }
    )
    .then((completion) => {
        console.log("Finished sampling:\n", completion);
    })
    .catch((error) => {
        console.error(error);
    });
