"use client";

import { editContentlet } from '@dotcms/uve';
import { useIsEditMode } from '@/hooks/useIsEditMode';
import type { DotCMSBasicContentlet } from '@dotcms/types';

interface EditButtonProps {
    contentlet: DotCMSBasicContentlet;
}

export function EditButton({ contentlet }: EditButtonProps) {
    const isEditMode = useIsEditMode();
    return (
        isEditMode && (
            <button
                onClick={() => editContentlet(contentlet)}
                className="absolute bottom-2 right-2 z-10 bg-blue-500 cursor-pointer text-white rounded-md py-1 px-3 text-sm shadow-md hover:bg-blue-600">
                Edit
            </button>
        )
    );
}
