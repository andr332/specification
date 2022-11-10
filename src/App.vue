<template>
  <div class="my-6 mx-auto px-4 lg:px-0 w-full ld:w-[1000px]">
    <div class="flex flex-col lg:flex-row gap-x-10 justify-center">
      <List v-model:activeSpecId="activeSpecId"
           :specifications="specifications"
            @updateSelectedId="updateSelectedId"
      />

      <Form v-model:form="form"
            v-model:showNewOption="showNewOption"
            :activeSpecId="activeSpecId"
            @createSpec="createSpecification"
            @updateSpec="updateSpecification"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import List from "./components/List.vue";
  import Form from './components/Form.vue'
  import {reactive, ref} from "vue";
  import {specificationsI} from "./interface";
  import { useToast } from 'vue-toastification';

  const toast = useToast();

  //State
  const activeSpecId = ref(0)
  const showNewOption = ref(false)
  const form = ref<specificationsI>({
    id: 0,
    name: '',
    engine: '',
    color: '',
    interiorMaterial: '',
    wheelSize: '',
    wheelModel: '',
    airSuspension: false,
    signature: '',
    year: ''
  })

  const specifications = reactive<Array<specificationsI>>([
    {
      id: 1,
      name: 'Sport',
      engine: 'V6',
      color: 'White',
      interiorMaterial: 'Nylon',
      wheelSize: '15 inches',
      wheelModel: 'Steering',
      airSuspension: true,
      signature: 'Fast & furious'
    },
    {
      id: 2,
      name: 'Standard',
      engine: 'V8',
      color: 'Black',
      interiorMaterial: 'Leather',
      wheelSize: '17 inches',
      wheelModel: 'Tesla',
      airSuspension: false,
      signature: 'Need for speed'
    },
  ])

  //Methods
  const updateSelectedId = (id: number):void => {
    activeSpecId.value = id
    if (id === 0) return resetFormData()

    const activeItem = specifications.find((item: specificationsI) => item.id === activeSpecId.value)
    if (activeItem) form.value = {...activeItem} as specificationsI
  }

  const createSpecification = ():void=>{
    const nameAlreadyExists = specifications.find((item:specificationsI)=>item.name === form.value.name)
    if (nameAlreadyExists) return toast.error('Name Of Specification must be unique');

    form.value.id = specifications.length + 1
    specifications.unshift(form.value)

    updateSelectedId(form.value.id)
  }

  const updateSpecification = ():void=>{
    specifications.map((element:specificationsI, index) => {
      if (element.id === form.value.id) specifications[index] = form.value
      return element
    });

    updateSelectedId(form.value.id)
  }

  const resetFormData = ():void=>{
    form.value = {
      id: 0,
      name: '',
      engine: '',
      color: '',
      interiorMaterial: '',
      wheelSize: '',
      wheelModel: '',
      airSuspension: false,
      signature: '',
      year: ''
    }
  }
</script>

<style>
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0
  }
</style>
