import React from 'react';
import Papa from 'papaparse';
class FileReader extends React.Component {
    constructor() {
      super();
      this.state = {
        csvFile: []
      };
      this.updateData = this.updateData.bind(this);
    }
  
    handleChange = event => {
      this.setState({
        csvFile: event.target.files[0]
      });
    };
  
    importCSV = () => {
      const { csvFile } = this.state;
      Papa.parse(csvFile, {
        complete: this.updateData,
        header: true
      });
    };
  
    updateData(result) {
      var data = result.data;
      console.log(data);
    }
  
    render() {
      console.log(this.state.csvFile);
      return (
        <div className="App">
          <h2>Import CSV File!</h2>
          <input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <p />
          <button onClick={this.importCSV}> Upload now!</button>
        </div>
      );
    }
  }
  
  export default FileReader;