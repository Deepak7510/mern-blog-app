/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARATAdAzPCkDsBWKBGAnF5yAMWG+IWIAHMlHASXACz377ksblwZRIQCmAdknxhgGMMOFjJAXUgATEFACGUfPQjSgA==
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Alignment,
    Autosave,
    BlockQuote,
    Bold,
    Essentials,
    GeneralHtmlSupport,
    Heading,
    HorizontalLine,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    ListProperties,
    Mention,
    Paragraph,
    PasteFromOffice,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Style,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TodoList,
    Underline
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

// import './App.css';

const LICENSE_KEY =
    'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDM2MzgzOTksImp0aSI6ImU0NzI3NTUyLWFjM2UtNDY5My1iZTE5LWY3NTA4MDgwOTVmYyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImM0NWYzNzRmIn0.j9fIFcNTtCelgTffSQNd6Ucu-2hjc-WtXF9z598cauR3MtOCUCYQ7pCPWATXPLVdDlCc0mmjRIwmsu5EbWc5ag';

export default function TextEditer({ initialData, handleEditerData }) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const { editorConfig } = useMemo(() => {
        if (!isLayoutReady) {
            return {};
        }

        return {
            editorConfig: {
                toolbar: {
                    items: [
                        'heading',
                        'style',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'specialCharacters',
                        'horizontalLine',
                        'link',
                        'insertTable',
                        'blockQuote',
                        '|',
                        'alignment',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'todoList',
                        'outdent',
                        'indent'
                    ],
                    shouldNotGroupWhenFull: false
                },
                plugins: [
                    Alignment,
                    Autosave,
                    BlockQuote,
                    Bold,
                    Essentials,
                    GeneralHtmlSupport,
                    Heading,
                    HorizontalLine,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    ListProperties,
                    Mention,
                    Paragraph,
                    PasteFromOffice,
                    SpecialCharacters,
                    SpecialCharactersArrows,
                    SpecialCharactersCurrency,
                    SpecialCharactersEssentials,
                    SpecialCharactersLatin,
                    SpecialCharactersMathematical,
                    SpecialCharactersText,
                    Style,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    TodoList,
                    Underline
                ],
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                        },
                        {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1'
                        },
                        {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2'
                        },
                        {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3'
                        },
                        {
                            model: 'heading4',
                            view: 'h4',
                            title: 'Heading 4',
                            class: 'ck-heading_heading4'
                        },
                        {
                            model: 'heading5',
                            view: 'h5',
                            title: 'Heading 5',
                            class: 'ck-heading_heading5'
                        },
                        {
                            model: 'heading6',
                            view: 'h6',
                            title: 'Heading 6',
                            class: 'ck-heading_heading6'
                        }
                    ]
                },
                htmlSupport: {
                    allow: [
                        {
                            name: /^.*$/,
                            styles: true,
                            attributes: true,
                            classes: true
                        }
                    ]
                },
                initialData: initialData || "",
                licenseKey: LICENSE_KEY,
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                },
                mention: {
                    feeds: [
                        {
                            marker: '@',
                            feed: [
                                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
                            ]
                        }
                    ]
                },
                placeholder: 'Type or paste your content here!',
                style: {
                    definitions: [
                        {
                            name: 'Article category',
                            element: 'h3',
                            classes: ['category']
                        },
                        {
                            name: 'Title',
                            element: 'h2',
                            classes: ['document-title']
                        },
                        {
                            name: 'Subtitle',
                            element: 'h3',
                            classes: ['document-subtitle']
                        },
                        {
                            name: 'Info box',
                            element: 'p',
                            classes: ['info-box']
                        },
                        {
                            name: 'Side quote',
                            element: 'blockquote',
                            classes: ['side-quote']
                        },
                        {
                            name: 'Marker',
                            element: 'span',
                            classes: ['marker']
                        },
                        {
                            name: 'Spoiler',
                            element: 'span',
                            classes: ['spoiler']
                        },
                        {
                            name: 'Code (dark)',
                            element: 'pre',
                            classes: ['fancy-code', 'fancy-code-dark']
                        },
                        {
                            name: 'Code (bright)',
                            element: 'pre',
                            classes: ['fancy-code', 'fancy-code-bright']
                        }
                    ]
                },
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
                }
            }
        };
    }, [isLayoutReady]);

    return (
        <div className="main-container">
            <div className="editor-container editor-container_classic-editor editor-container_include-style" ref={editorContainerRef}>
                <div className="editor-container__editor">
                <div ref={editorRef}>{editorConfig && <CKEditor onChange={handleEditerData} editor={ClassicEditor} config={editorConfig} />}</div>
                </div>
            </div>
        </div>
    );
}
