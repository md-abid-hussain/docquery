'use client'

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCoAgent, useCopilotReadable, useCopilotChat } from '@copilotkit/react-core';
import { CopilotChat } from '@copilotkit/react-ui';
import { QAAgentState } from '@/lib/types';
import useRepoDetails from '@/hooks/useRepoDetails';
import CopilotTextMessage from '@/components/copilot/copilot-text-message';

const ChatRepoPage = () => {
    const { owner, repo } = useParams();

    if (!owner || !repo) {
        return <div>Loading...</div>;
    }

    const { repoDetails, loading, error } = useRepoDetails(owner as string, repo as string);

    useCopilotReadable({
        description: "use qa agent to answer this",
        value: "qa_agent",
    });

    
    const { state, setState } = useCoAgent<QAAgentState>({
        name: "qa_agent",
        initialState: {
            question: "",
            repository_name: `${owner}/${repo}`,
            messages:[]
        }
    });

    useEffect(() => {
        setState({
            question: "",
            repository_name: `${owner}/${repo}`,
        })
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
                    labels={{ title: `Ask any question related to $` }}
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