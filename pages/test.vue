<script setup lang="ts">
import TagsInput from "~/components/TagsInput.vue"

// pour l'instant en supplément il faut installer un sass npm install -D sass-embedded
// je verrai pour le retirer en utilisant du css uniquemeent
import "@mimachh/multi-select/dist/multi-select.scss";
// import "@mimachh/multi-select";
import { MultiSelect } from "@mimachh/multi-select";
// waiting for a reamde in the package
// defaultOptions is the options used if you dont need any search query. You can pass static options in there.
// options is dynamic options (for now it's not working cause i didnt add the async in the component)
// searchable is a boolean to enable search -> if it's enable only the options will be displayed, not the defaultoptions + there is no filter between searchquery and options displayed, because you'll need to add this in your app.


const defaultOptions = [
    { id: 1, value: 'Option 1' },
    { id: 2, value: 'Option 2' },
    { id: 3, value: 'Option 3' },
    { id: 4, value: 'Option 4' },
    { id: 5, value: 'Option 5' },
    { id: 6, value: 'Option 6' },
    { id: 7, value: 'Option 7' },
    { id: 8, value: 'Option 8' },
    { id: 9, value: 'Option 9' },
    { id: 10, value: 'Option 10' },
    { id: 11, value: 'Option 11' },
    { id: 12, value: 'Option 12' },
    { id: 13, value: 'Option 13' },
    { id: 14, value: 'Option 14' },
    { id: 15, value: 'Option 15' },
    { id: 16, value: 'Option 16' },
    { id: 17, value: 'Option 17' },
    { id: 18, value: 'Option 18' },
    { id: 19, value: 'Option 19' },
    { id: 20, value: 'Option 20' },
];


// @ts-ignore
const handleSelectedOptions = (selectedOptions) => {
    console.log('Selected option:', selectedOptions);
};

const handleSearch = async (searchQuery: { value: string }) => {
    console.log('Search query', searchQuery);
};

</script>
<template>
  <div class="flex flex-col justify-center items-center mx-auto">
    <h1>Test Page</h1>
    <TagsInput />
  </div>

  <div>
    <h2>Package</h2>
    <MultiSelect
    
    :default-options="defaultOptions"
    :options="defaultOptions" 
    :multiple="true" 
    @update:selected="handleSelectedOptions"  
    @search="handleSearch"  
    :searchable="true"
    :creatable="true"
  />
  </div>
</template>
