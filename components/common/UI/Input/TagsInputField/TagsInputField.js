import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import NoSSR from 'react-no-ssr';
import variables from '../../../globalVariables';
 
class TagsInputField extends React.Component {
  constructor (props) {
    super(props);
    let suggestions = [];

    if(props.options) {
      suggestions = props.options.map((option, index)=>{
      return {id: index, name: option};
      });
    }

 
    this.state = {
      tags: props.tags || [],
      suggestions: (props.options ? suggestions : [])
    };

    console.log("invoked");
  }

  handleDelete (i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
     this.passValueToChangeProp(tags);
  }
 
  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
    this.passValueToChangeProp(tags);
  }

  passValueToChangeProp = (tags) => {
    if(this.props.change) {
      const values = tags.map(tag => tag.name).join(",");
      this.props.change(values);
    }
  };
 
  render () {
    return (
        <NoSSR>
            <ReactTags
                tags={this.state.tags}
                suggestions={this.state.suggestions}
                handleDelete={this.handleDelete.bind(this)}
                // delimiters={[9]}
                handleAddition={this.handleAddition.bind(this)} />
                <style jsx global>{`

                    .react-tags {
                        display: flex;
                        width: 100%;
                    }

                    button, input {
                        margin: auto 2px;
                    }
                    
                    input {
                      padding: 5px;
                      min-width: 100px;
                      border: none;
                    }

                    button {
                        background-color: ${variables.accentColor1};
                        border: 1px solid white;
                        padding: 5px 10px;
                        color: ${variables.clearColor};
                        border-radius: 5px;
                    }
                    
                    .react-tags__suggestions {
                      background-color: blue;
                      position: absolute;
                     
                    }
                    
                    .react-tags__suggestions li {
                      list-style-type: none;
                    }
                    
                `}</style>
        </NoSSR>
    )
  }
}
 
export default TagsInputField;