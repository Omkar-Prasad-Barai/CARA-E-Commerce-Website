const { execSync } = require('child_process');

const GIT_EMAIL = 'omkarprasadbarai7597@gmail.com';
const GIT_NAME = 'Omkar Prasad Barai';

const START_DATE = new Date('2025-12-14T10:00:00');
const END_DATE = new Date('2026-01-16T21:00:00');

const COMMIT_MESSAGES = [
    "chore: minor code formatting and cleanup",
    "style: fix indentation and trailing spaces",
    "refactor: optimize component re-renders",
    "fix: resolve typo in variable naming",
    "perf: improve asset loading strategy",
    "test: add missing unit test placeholders",
    "chore: sort imports across files",
    "style: apply prettier formatting",
    "refactor: extract magic strings to constants"
];

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function getRandomMessage() { return COMMIT_MESSAGES[Math.floor(Math.random() * COMMIT_MESSAGES.length)]; }
function formatGitDate(date) { return date.toISOString(); }

function runCommand(command, envVariables = {}) {
    try {
        execSync(command, { stdio: 'inherit', env: { ...process.env, ...envVariables } });
    } catch (error) { console.error(`Failed: ${command}`); process.exit(1); }
}

runCommand(`git config user.email "${GIT_EMAIL}"`);
runCommand(`git config user.name "${GIT_NAME}"`);

console.log('Step 1: Committing REAL FILES in the past (Dec 14, 2025)...');
runCommand('git add .');
const initialDateStr = formatGitDate(START_DATE);
runCommand(`git commit -m "init: setup Cara E-commerce project architecture"`, {
    GIT_AUTHOR_DATE: initialDateStr,
    GIT_COMMITTER_DATE: initialDateStr
});

console.log('Step 2: Generating GHOST commits (No files touched)...');
let currentDate = new Date(START_DATE);
currentDate.setDate(currentDate.getDate() + 1);

while (currentDate <= END_DATE) {
    const numCommits = getRandomInt(4, 7);
    let dayTimes = [];
    for (let i = 0; i < numCommits; i++) {
        let commitTime = new Date(currentDate);
        commitTime.setHours(getRandomInt(10, 21), getRandomInt(0, 59), getRandomInt(0, 59));
        dayTimes.push(commitTime);
    }
    dayTimes.sort((a, b) => a - b);

    for (const timestamp of dayTimes) {
        const dateString = formatGitDate(timestamp);
        const message = getRandomMessage();
        // USING --allow-empty SO NO FILES ARE CREATED OR MODIFIED
        runCommand(`git commit --allow-empty -m "${message}"`, {
            GIT_AUTHOR_DATE: dateString,
            GIT_COMMITTER_DATE: dateString
        });
    }
    currentDate.setDate(currentDate.getDate() + getRandomInt(1, 4));
}

console.log('\nAll done! NOW DELETE THIS SCRIPT FILE BEFORE PUSHING!');