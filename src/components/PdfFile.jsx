import React from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    paddingTop: '35px',
    paddingBottom: '65px',
    paddingHorizontal: '35px',
  },
  title: {
    fontSize: '24px',
    textAlign: 'center',
  },
  image: {
    display: 'block',
    objectFit: 'cover',
    width: '512px',
    height: '512px',
  },
  text: {
    margin: '12px',
    fontSize: '16px',
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
});

export default function PdfFile({
  title,
  description,
  storyBody,
  storyEnd,
}) {
  return (
    <Document>
      <Page style={styles.body} size='A4'>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{storyBody}</Text>
        <Text style={styles.text}>{storyEnd}</Text>
      </Page>
    </Document>
  );
}
