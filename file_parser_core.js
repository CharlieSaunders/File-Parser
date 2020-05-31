/////////////////////////////////////////////
//              CSV Parser Alpha           //
/////////////////////////////////////////////

function csv_parser(file, parse_row_0, mode, delimiter){
    //debug vars
        let debug_data = [];
        let debug_start = performance.now(2);
    //
    if(file == null || parse_row_0 == null){
        console.error("Expected 2 core params for CSV parse. File (F) and Bool for parsing row 0 (0).")
        console.error("(F) %o, (0) %s, Mode = %s.", file[0], parse_row_0, mode)
        return 0;
    }else{
        let debug_params = performance.now(2); debug_data.push((debug_params - debug_start).toFixed(3))
        handle_file(file)
    }

    delimiter = delimiter || '\n'
    let returned_data = [];
    let data_array = [];
    let row_0 = parse_row_0;

    function handle_file(file){
        if(window.FileReader){
            convert_to_text(file[0]);
        }else{
            alert("File Reader API not supported in this browser.");
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
        let debug_process = performance.now(2)
        let raw_data_array = data.split(delimiter);
        if(row_0 == true){
            for(i = 0; i < raw_data_array.length; i++){
              data_array.push(raw_data_array[i]);
            }
        }
        else{
            for(i = 1; i < raw_data_array.length; i++){
              data_array.push(raw_data_array[i]);
            }
        }
        let debug_processed = performance.now(2) - debug_process; debug_data.push(debug_processed.toFixed(3))
        insert_data(data_array);
    }

    function errorer(event){
        if(event.target.error.name == "NotReadableError"){
            alert("Unable to read the file given");
        }
    }

    function insert_data(data_array){
        let debug_insert = performance.now(2)
        for(i = 0; i<data_array.length; i++){
            let data_words = data_array[i].split(" ");
            returned_data.push(data_words);
        }
        let debug_inserted = performance.now(2) - debug_insert; debug_data.push(debug_inserted.toFixed(3))
        if(mode.toLowerCase() == "debug"){
            debug_log(returned_data, file, parse_row_0, mode, delimiter, debug_data);
            return 0;
        }else{
            return returned_data;
        }
    }
    return returned_data;
}
//////////////////////////////////////////////////////////////////
//                            debug                             //
//////////////////////////////////////////////////////////////////
function debug_log(returned_data, file, parse_row_0, mode, delimiter, debug_data){
    if(delimiter == '\n'){delimiter = 'Default \\n'}
    if(delimiter == '\r'){delimiter = 'New Row \\r'}
    console.log("%cDEBUG DATA FOR CSV PARSER","color: white; background-color: green; width: 100%;")
    console.warn("Debug enabled. Returning all function data...\nDebug mode still returns the data obj. ")
    console.warn("(F) %s, (0) %s, Mode = %s, Delimiter = %s.", file[0], parse_row_0, mode, delimiter)
    console.warn("Timestamps for performance check => \nParameter check = %s \nProcessing data = %s \nInserting data = %s", debug_data[0], debug_data[1], debug_data[2])
    console.warn("Returned data below:")
    console.log(returned_data)
    console.log("%cEND OF DEBUG FOR PARSER","color: white; background-color: green; width: 100%;")
    return returned_data
}

//////////////////////////////////////////////////////////////////
