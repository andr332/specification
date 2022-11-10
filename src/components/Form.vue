<template>
  <div class="mt-6 lg:mt-0 w-full lg:w-[500px]">
    <h1 class="text-2xl font-semibold text-center mb-6">
      {{title}}
    </h1>

    <div class="form-group mb-4">
      <label for="nameOfSpecification" class="block text-sm font-medium text-gray-700">Name Of Specification*</label>
      <div class="mt-1">
        <input type="text" name="nameOfSpecification" id="nameOfSpecification"
               v-model="formModel.name"
               class="block w-full rounded-md border border-gray-300 h-[40px] px-3 shadow-sm sm:text-sm"/>
      </div>
    </div>

    <div class="form-group mb-4">
      <label for="engine" class="block text-sm font-medium text-gray-700">Engine*</label>
      <select id="engine" name="engine"
              v-model="formModel.engine"
              class="mt-1 block w-full rounded-md border border-gray-300 h-[40px] px-3 shadow-sm sm:text-sm">
        <option v-for="(option,index) in engineOptions" :value="option.value" :key="index">{{ option.label }}</option>
      </select>
    </div>

    <div class="form-group mb-4">
      <label for="color" class="block text-sm font-medium text-gray-700">Color*</label>
      <select id="color" name="color"
              v-model="formModel.color"
              class="mt-1 block w-full rounded-md border border-gray-300 h-[40px] px-3 shadow-sm sm:text-sm">
        <option v-for="(option,index) in colorOptions" :value="option.value" :key="index">{{ option.label }}</option>
      </select>
    </div>

    <div class="form-group mb-4">
      <label for="interiorMaterial" class="block text-sm font-medium text-gray-700">Interior Material</label>
      <select id="interiorMaterial" name="interiorMaterial"
              v-model="formModel.interiorMaterial"
              class="mt-1 block w-full rounded-md border border-gray-300 h-[40px] px-3 shadow-sm sm:text-sm">
        <option v-for="(option,index) in interiorOptions" :value="option.value" :key="index">{{ option.label }}</option>
      </select>
    </div>

    <div class="form-group mb-4">
      <label for="wheelRims" class="block text-sm font-medium text-gray-700">Wheel Size</label>
      <select id="wheelRims" name="wheelRims"
              v-model="formModel.wheelSize"
              class="mt-1 block w-full rounded-md border border-gray-300 h-[40px] px-3 shadow-sm sm:text-sm">
        <option v-for="(option,index) in wheelSizesOptions" :value="option.value" :key="index">{{ option.label }}</option>
      </select>
    </div>

    <div class="form-group mb-4">
      <label for="wheelModel" class="block text-sm font-medium text-gray-700">Wheel Model</label>
      <select id="wheelModel" name="wheelModel"
              v-model="formModel.wheelModel"
              class="mt-1 block w-full rounded-md border border-gray-300 h-[40px] px-3 shadow-sm sm:text-sm">
        <option v-for="(option,index) in modelOptions" :value="option.value" :key="index">{{ option.label }}</option>
      </select>
    </div>

    <div class="form-group mb-4 flex items-center gap-2">
      <div class="">
        <input type="checkbox" name="airSuspension" id="airSuspension"
               v-model="formModel.airSuspension"
               class="block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"/>
      </div>
      <label for="airSuspension" class="block text-sm font-medium text-gray-700 cursor-pointer">Air Suspension</label>
    </div>

    <div class="form-group mb-4">
      <label for="signature" class="block text-sm font-medium text-gray-700">Signature on hood</label>
      <div class="mt-1">
        <input type="text" name="signature" id="signature"
               v-model="formModel.signature"
               class="block w-full rounded-md border border-gray-300 h-[40px] px-3 shadow-sm sm:text-sm"/>
      </div>
    </div>

    <div class="form-group mb-4" v-if="showNewOption">
      <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
      <div class="mt-1">
        <input type="number" name="year" id="year"
               v-model="formModel.year"
               class="block w-full rounded-md border border-gray-300 h-[40px] px-3 shadow-sm sm:text-sm"/>
      </div>
    </div>

    <div class="flex gap-x-4 justify-between text-center mt-8">
      <button class="bg-blue-500 text-white rounded-lg px-4 py-2" @click="$emit('update:showNewOption', true)"
              v-if="!showNewOption">+ New configuration option
      </button>
      <button class="bg-green-500 text-white rounded-lg px-4 py-2"
              :class="{'cursor-not-allowed bg-gray-200': !isValid}"
              :disabled="!isValid"
              @click="formHandler" >{{ submitCaption }}
      </button>
    </div>

  </div>
</template>

<script lang="ts" setup>
  import {computed, defineEmits, defineProps} from "vue";
  import {CarColor, CarEngine, CarInterior, CarModel, CarWheelSizes} from "../interface/carOptions";
  import {specificationsI} from "../interface";

  interface FormEmits {
    (e: "updateSpec"): void;
    (e: "createSpec"): void;
    (e: "update:form", value: specificationsI): void;
  }

  interface FormProps {
    activeSpecId: number
    showNewOption: boolean
    form: specificationsI
  }
  const emit = defineEmits<FormEmits>()
  const props = defineProps<FormProps>()

  const convertEnumToSelectBoxOptions = (object: Record<string, string>) =>
      Object.entries(object).map(([, label]) => ({ label, value: label }));

  const engineOptions = convertEnumToSelectBoxOptions(CarEngine);
  const colorOptions = convertEnumToSelectBoxOptions(CarColor);
  const interiorOptions = convertEnumToSelectBoxOptions(CarInterior);
  const wheelSizesOptions = convertEnumToSelectBoxOptions(CarWheelSizes);
  const modelOptions = convertEnumToSelectBoxOptions(CarModel);

  //Computed
  const isValid = computed(() => {
    return props.form.name && props.form.engine && props.form.color;
  });

  const title = computed(() =>
    props.activeSpecId ? "Update specification" : "Add new specification"
  );
  const submitCaption = computed(() =>
      props.activeSpecId ? "Update" : "Create"
  );

  const formModel = computed({
    get: () => props.form,
    set: (value: specificationsI) => emit('update:form', value),
  });


  //Methods
  const formHandler = ():void => {
    if (!isValid) return !props.activeSpecId ? emit('createSpec') : emit('updateSpec')
  }
</script>
