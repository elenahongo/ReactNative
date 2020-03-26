import React, {Component} from "react";
import {StyleSheet, View, Text, Image, FlatList} from "react-native";
import BookItem from "./bookItem.js"
import NYT from "./NYT.js";


class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {data: []}
  }

  _refreshData = () => {
    NYT.fetchBooks().then(books => {
      console.log(books)
      this.setState({data: this._addKeysToBooks(books) });
    });
  };

  componentDidMount(){
    this._refreshData()
  }

  _renderItem = ({item}) => {
    return (
      <BookItem
          coverURL={item.book_image}
          title={item.title}
          author={item.author}
      />
    )
  }

  _addKeysToBooks = books => {
    // Takes the API response from the NYTimes
    // and adds a key property to the object
    // for rendering purposes
    return books.map(book => {
      console.log("this is the " + JSON.stringify(book.book_details[0]))
      return Object.assign(book.book_details[0], {key: book.book_details[0].primary_isbn13,
      book_image: "http://du.ec2.nytimes.com.s3.amazonaws.com/prd/books/9780399168796.jpg"});  
    })
  }

render() {
  return <FlatList data={this.state.data} renderItem={this._renderItem} />
}

}

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 22 }
})

export default BookList;