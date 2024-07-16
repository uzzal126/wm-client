'use client'
import parse from 'html-react-parser';

export const RenderHead = ({ data }: { data: string }) => {
    const renderHead = (data: any) => parse(data)
    return (
        <>{renderHead(data)}</>
    );
};

export const RenderHtmlDom = ({ data }: { data: string }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: (data) }}></div>
    )
}