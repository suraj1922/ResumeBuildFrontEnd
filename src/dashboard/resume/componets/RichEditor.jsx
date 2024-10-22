import React from 'react'
import { useState } from 'react';
import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    Editor,
    EditorProvider,
    HtmlButton,
    Separator,
    Toolbar
} from 'react-simple-wysiwyg';
const RichEditor = () => {
    const [value, setValue] = useState();
    return (
        <div>
            <EditorProvider>
                <Editor value={value} onChange={() => {
                    setValue(e.target.value)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline/>
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                        <HtmlButton />
                        <Separator />
                        <BtnStyles />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichEditor