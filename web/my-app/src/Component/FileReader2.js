import React from 'react';
import FileReaderInput from 'react-file-reader-input';


class FileReader2 extends React.Component {
  handleChange = (e, results) => {
    results.forEach(result => {
      const [e, file] = result;
      this.props.dispatch(uploadFile(e.target.result));
      console.log(`Successfully uploaded ${file.name}!`);
    });
  }
  render() {
    return (
      <form>
        <label htmlFor="my-file-input">Upload a File:</label>
        <FileReaderInput as="binary" id="my-file-input"
                         onChange={this.handleChange}>
          <button>Select a file!</button>
        </FileReaderInput>
      </form>
    );
  }
}
export default FileReader2;