import { notFound } from "next/navigation";

interface ErrorPageProps {
    error: {
        status: number;
        message: string;
    };
}

export async function ErrorPage({ error }: ErrorPageProps) {
    if (error.status === 404) {
        notFound();
    }

    return (
        <div>
            <h1>Status: {error.status}</h1>
            <h2>Message: {error.message}</h2>
        </div>
    );
}
