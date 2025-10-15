## Agent instructions

- All comments in the code should be in English.
- All tasks located in `tasks` folder.

## Tasks

- [Setup project](tasks/setup.md)
- [Connect to Supabase](tasks/connect-to-supabase.md)

## Technology stack

- React 19
- TypeScript
- Tailwind CSS
- Vite
- React Router v6
- Superbase
- OpenAI API
- AWS Amplify (hosting for static files, SSR disabled)

## Project description

In DB we have list of Finns who earn more then 100k per year.
User can ask questions about these Finns. And our application should answer these questions.

We will use OpenAI API to understand user question and extract relevant data from DB.

## Links and docs:

- [Supabase](https://supabase.com/docs)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [React Router v6](https://reactrouter.com/en/main)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)
- [Supabase local development](https://supabase.com/docs/guides/local-development)

## Process for Creating New Tasks

The following process is used for creating new development tasks:

### 1. Task Preparation

1. **Use the template**: Take the template from `doc/ai_task_template.md` as the foundation for task planning
2. **Fill in key sections**:
   - **Problem**: Clearly describe the problem that needs to be solved
   - **Current task**: Formulate the specific task and expected outcome
   - **Solution paths**: Propose technical solution options considering the current architecture

### 2. Planning and Coordination

1. **Analyze current state**: Analyze existing code and architecture
2. **Define technical solution**: Choose the optimal approach considering:
   - Existing technical stack
   - Feature-Sliced Design architecture
   - Performance and security requirements
3. **Create implementation plan**: Break down the task into phases with specification of files to be modified

### 3. Confirmation Before Implementation

⚠️ **IMPORTANT**: Before starting code changes, it is necessary to:

1. **Present the plan to the user** with detailed description of:
   - Which files will be modified
   - What functionality will be added/changed
   - Possible risks and side effects
2. **Wait for confirmation** from the user
3. **Make adjustments** to the plan if necessary

### 4. Implementation Rules

- **Prohibited** to modify code files before receiving user confirmation
- **Must** use existing technical stack
- **Must** test changes before committing

### 5. Language Requirements

⚠️ **IMPORTANT**: All development artifacts must be in English:

- **All tasks and documentation** must be written in English
- **All code comments** must be in English
- **All commit messages** must be in English
- **All variable names, function names, and identifiers** must be in English
- **All error messages and user-facing text** must be in English (unless localization is specifically required)
