import React from 'react';
// import { Button } from 'react-bootstrap';

//fixed upload form

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileURL: '',
    };

    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  handleUploadFile(ev) {
    ev.preventDefault();
    const data = new FormData();
    console.log(this.uploadInput.files[0].name);
    const filename = this.uploadInput.files[0].name

      data.append('file', this.uploadInput.files[0]);
      data.append('filename', filename);
      if (this.uploadInput.files[0].name.includes(".docx") || this.uploadInput.files[0].name.includes(".pdf"))
      {
        
        fetch('http://localhost:3005/uploadresume', {
          method: 'POST',
          body: data,
        }).then((response) => {
          response.json().then((body) => {
            this.setState({ fileURL: `http://localhost:8000/${body.file}` });
          });        
        });
      }
      else {
        alert("invalid file type")
      }
  }


  render() {
    return (
      <form onSubmit={this.handleUploadFile}>
        <div><h2>Upload Resume</h2>
          <input ref={(ref) => { this.uploadInput = ref; }} 
          type="file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        {this.state.fileURL && <div>{this.state.fileURL} <br/>file upload complete</div>}
      </form>
    );
  }
}

export default Upload;