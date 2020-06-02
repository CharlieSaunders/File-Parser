/////////////////////////////////////////////
//              CSV Parser Alpha           //
/////////////////////////////////////////////
let data_words = [];
function file_parser(file, parse_row_0, row_delimiter){
    if(file == null || parse_row_0 == null){
        console.error("Expected 2 core params for CSV parse. File (F), Bool for parsing row 0 (0) and mode.\n(F) %o,\n(0) %s", file[0], parse_row_0,); 
        errorer("failed_parse");
        return 0;
    }
    
    handle_file(file)

    row_delimiter = row_delimiter || '\n'; 
    let data_array = [];
    let parse_start = 0;
    if(parse_row_0 == true){parse_start = 0}else{parse_start = 1}

    function handle_file(file){
        if(window.FileReader){
            convert_to_text(file[0]);
        }else{
            errorer("failed_file_handler");
            return 0;
        }
    }

    function convert_to_text(file){
        let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = loader;
            reader.onerror = errorer;
    }

    function loader(e){
        let data = e.target.result;
        process_data(data);
    }

    function process_data(data){
        let raw_data_array = data.split(row_delimiter);
        for(i = parse_start; i < raw_data_array.length; i++){
            data_array.push(raw_data_array[i]);
        }
        insert_data(data_array);
    }

    function insert_data(data_array){
        for(i = 0; i<data_array.length; i++){
            let string = data_array[i].split(" ")
            data_words.push(string)
        }
    }
    return data_words

// errorer
    function errorer(event){
        if(event.target.error.name == "NotReadableError"){
            alert("Unable to read the file given");
        }
        if(event == "failed_parse"){
            alert("Failed parsing of parameters check console for more verbose error.")
        }
        if(event == "failed_file_handler"){
            alert("File handler not supported or an error with the file handler in the browser.")
        }
        return 0
    }
}

//////////////////////////////////////////////////////////////////

