import { StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { color } from '../constants/colors'
import Markdown from 'react-native-markdown-display'

const MarkdownContent = ({children} : {children: ReactNode}) => {
    return (
        <Markdown
            style={{
                body: {
                    fontFamily: "Jakarta",
                    color: color.secondary[900],
                    fontSize: 16,
                    lineHeight: 26, // More comfortable paragraph spacing
                },
                heading1: {
                    fontFamily: "Jakarta-ExtraBold",
                    fontSize: 28,
                    lineHeight: 36,
                    color: color.secondary[900],
                    marginTop: 24,
                    marginBottom: 12,
                },
                heading2: {
                    fontFamily: "Jakarta-Bold",
                    fontSize: 24,
                    lineHeight: 32,
                    color: color.secondary[800],
                    marginTop: 20,
                    marginBottom: 10,
                },
                heading3: {
                    fontFamily: "Jakarta-SemiBold",
                    fontSize: 20,
                    lineHeight: 28,
                    color: color.secondary[700],
                    marginTop: 18,
                    marginBottom: 8,
                },
                paragraph: {
                    fontFamily: "Jakarta-Medium",
                    color: color.secondary[800],
                    fontSize: 16,
                    lineHeight: 26,
                    marginBottom: 10,
                },
                strong: {
                    fontFamily: "Jakarta-Bold",
                    color: color.secondary[900],
                    lineHeight: 24,
                },
                em: {
                    fontFamily: "Jakarta-Medium",
                    color: color.secondary[700],
                    fontStyle: "italic",
                    lineHeight: 24,
                },
                link: {
                    color: "#007aff",
                    fontFamily: "Jakarta-SemiBold",
                    textDecorationLine: "underline",
                    lineHeight: 24,
                },
                list_item: {
                    flexDirection: "row",
                    marginVertical: 6,
                    lineHeight: 24,
                },
                bullet_list: {
                    paddingLeft: 22,
                },
                ordered_list: {
                    paddingLeft: 22,
                },
                code_inline: {
                    backgroundColor: color.secondary[200],
                    color: color.secondary[900],
                    fontFamily: "Jakarta-Medium",
                    paddingHorizontal: 6,
                    paddingVertical: 3,
                    borderRadius: 6,
                    lineHeight: 20,
                },
                code_block: {
                    backgroundColor: color.secondary[200],
                    color: color.secondary[900],
                    fontFamily: "Jakarta-Medium",
                    fontSize: 14,
                    lineHeight: 22,
                    padding: 12,
                    borderRadius: 8,
                    marginVertical: 10,
                },
                blockquote: {
                    borderLeftWidth: 4,
                    borderLeftColor: color.secondary[500],
                    paddingLeft: 12,
                    color: color.secondary[700],
                    fontStyle: "italic",
                    lineHeight: 24,
                    marginVertical: 10,
                },
                hr: {
                    backgroundColor: color.secondary[300],
                    height: 1,
                    marginVertical: 14,
                },
            }}
        >
            {children}
        </Markdown>
    )
}

export default MarkdownContent

const styles = StyleSheet.create({})