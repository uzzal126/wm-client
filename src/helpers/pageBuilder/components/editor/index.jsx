import React from 'react'

const EditorComp = ({ data }) => {
  return data?.content.includes('\%') || data?.content.includes('\\') || data?.content.includes('/\\/') ? 
  <div dangerouslySetInnerHTML={{ __html: unescape(data?.content) }}></div> : 
  <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
}

export default EditorComp
