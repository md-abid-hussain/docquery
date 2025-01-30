'use client'

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCoAgent, useCopilotReadable, useCopilotMessagesContext, useCopilotContext } from '@copilotkit/react-core';
import { CopilotChat } from '@copilotkit/react-ui';
import { QAAgentState } from '@/lib/types';
import useRepoDetails from '@/hooks/useRepoDetails';
import CopilotTextMessage from '@/components/copilot/copilot-text-message';

const ChatRepoPage = () => {

    const { owner, repo } = useParams();
    const { setMessages } = useCopilotMessagesContext();
    const { setAgentSession } = useCopilotContext()

    if (!owner || !repo) {
        return <div>Loading...</div>;
    }

    const { repoDetails } = useRepoDetails(owner as string, repo as string);

    useCopilotReadable({
        description: "use qa agent to answer this",
        value: "qa_agent",
    });


    const { state, setState } = useCoAgent<QAAgentState>({
        name: "qa_agent",
        initialState: {
            question: "",
            repository_name: `${owner}/${repo}`,
            messages: []
        }

    });

    useEffect(() => {
        setState({
            question: "",
            repository_name: `${owner}/${repo}`,
        })
        return () => {
            setMessages([]);
            setAgentSession(null);
        }
    }, []);

    return (
        <div className='py-4'>
            <div className='flex bg-slate-50 -mt-10 items-center p-4'>
                <img src={repoDetails?.image_url} alt={repo as string} className='w-12 h-12 rounded-full' />
                <h2 className='text-2xl p-4 flex-1 font-bold'>
                    Chat with {repo}
                </h2>
            </div>
            <div className="flex flex-col">
                <CopilotChat
                    labels={{
                        title: "Your Assistant",
                        initial: "Hi! 👋 How can I assist you today?",
                    }}
                    onSubmitMessage={(message) => {
                        setState({ ...state, question: message });
                    }}
                    RenderTextMessage={(props) => {
                        return (
                            <CopilotTextMessage
                                key={props.message.id} // Ensure stable key
                                renderMessageProps={props}
                                repoProps={{ imageUrl: repoDetails?.image_url as string, repoName: repo as string }}
                            />
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default ChatRepoPage;