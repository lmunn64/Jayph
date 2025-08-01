import { defineComponent, reactive, withAsyncContext, ref, computed, watch, unref, mergeProps, mergeModels, useTemplateRef, useModel, isRef, resolveComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import VueDatePicker from '@vuepic/vue-datepicker';
import { _ as _export_sfc } from './server.mjs';
import { u as useAsyncData } from './asyncData-B_vdoQGz.mjs';
import { defineStore } from 'pinia';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "VueCalendar",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    forSearch: { type: Boolean, default: false },
    cal_data: {}
  }, {
    "modelValue": { required: true },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["delete-quote-response"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const date = ref();
    ref();
    const isWideEnough = ref(false);
    const clearDateBtn = useTemplateRef("clear-date-btn");
    const datepicker = ref(null);
    const emit = __emit;
    const selectedDates = useModel(__props, "modelValue");
    const tempDisabledDates = ref([]);
    const tempHighlightedDates = ref([]);
    const tempHighlightedMaxDate = ref([]);
    const minStayHighlightedDates = ref([]);
    ref(true);
    const maxDate = ref(new Date((/* @__PURE__ */ new Date()).setFullYear((/* @__PURE__ */ new Date()).getFullYear() + 2)));
    const props = __props;
    const handleDateUpdate = (selectedDate) => {
      var _a, _b;
      console.log(selectedDate);
      if (selectedDate && Array.isArray(selectedDate) && selectedDate.length === 2) {
        const [startDate, endDate] = selectedDate;
        if (startDate && endDate) {
          const formattedDates = [formatSingleDate(startDate), formatSingleDate(endDate)];
          selectedDates.value = [...formattedDates];
          (_a = clearDateBtn.value) == null ? void 0 : _a.classList.add("set");
          console.log("Range selected:", formattedDates);
        }
      } else if (!selectedDate) {
        selectedDates.value = null;
        (_b = clearDateBtn.value) == null ? void 0 : _b.classList.remove("set");
      }
    };
    const handleDateSelection = (selectedDate) => {
      var _a;
      if (!props.cal_data) {
        return;
      }
      emit("delete-quote-response");
      const startDate = formatSingleDate(selectedDate);
      console.log(startDate);
      (_a = clearDateBtn.value) == null ? void 0 : _a.classList.add("set");
      const startDateObj = props.cal_data.dates.find((d) => d.date === startDate);
      if (!startDateObj) {
        return;
      }
      const min_stay = startDateObj.min_stay;
      const startDateIndex = props.cal_data.dates.findIndex((d) => d.date === startDate);
      const maxDateIndex = props.cal_data.dates.findIndex((d, index, dArr) => {
        var _a2;
        return index >= startDateIndex && !d.available && (!((_a2 = dArr[index - 1]) == null ? void 0 : _a2.available) && !d.closed_for_checkin);
      });
      const checkinHighlightedDate = tempHighlightedDates.value.find((d) => {
        var _a2, _b;
        return formatSingleDate(d) === ((_b = (_a2 = props.cal_data) == null ? void 0 : _a2.dates.at(maxDateIndex - 1)) == null ? void 0 : _b.date);
      });
      if (checkinHighlightedDate)
        tempHighlightedMaxDate.value.push(checkinHighlightedDate);
      console.log(min_stay);
      if (min_stay > 1) {
        minStayHighlightedDates.value = props.cal_data.dates.filter((d, index, dArr) => index > startDateIndex && index < startDateIndex + min_stay).map((d) => /* @__PURE__ */ new Date(d.date + "T00:00:00"));
      }
      tempDisabledDates.value = props.cal_data.dates.filter((d, index, dArr) => index < startDateIndex || maxDateIndex > 0 && index >= maxDateIndex).map((d) => /* @__PURE__ */ new Date(d.date + "T00:00:00"));
    };
    const formatSingleDate = (date2) => {
      const day = date2.getDate();
      const month = date2.getMonth() + 1;
      const year = date2.getFullYear();
      return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    };
    const unavailableDates = computed(() => {
      const base = props.cal_data ? props.cal_data.dates.filter((d, index, dArr) => {
        var _a;
        return !d.available && (!((_a = dArr[index - 1]) == null ? void 0 : _a.available) && !d.closed_for_checkin);
      }).map((d) => /* @__PURE__ */ new Date(d.date + "T00:00:00")) : [];
      return [...base, ...tempDisabledDates.value || []];
    });
    const checkInOnly = computed(() => {
      if (!props.cal_data) {
        return [];
      }
      const highlighted = props.cal_data.dates.filter((d, index, dArr) => {
        var _a;
        return !d.available && (((_a = dArr[index - 1]) == null ? void 0 : _a.available) && !d.closed_for_checkin);
      }).map((d) => /* @__PURE__ */ new Date(d.date + "T00:00:00"));
      const filtered = highlighted.filter(
        (d) => !tempHighlightedMaxDate.value.some(
          (maxDate2) => d.getTime() === maxDate2.getTime()
        )
      );
      tempHighlightedDates.value = highlighted;
      return [...filtered, ...minStayHighlightedDates.value || []];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["calendarWrapper", { "search-calendar": _ctx.forSearch }]
      }, _attrs))} data-v-035ecb59><div class="calendarContainer" data-v-035ecb59>`);
      _push(ssrRenderComponent(unref(VueDatePicker), {
        ref_key: "datepicker",
        ref: datepicker,
        modelValue: unref(date),
        "onUpdate:modelValue": [($event) => isRef(date) ? date.value = $event : null, handleDateUpdate],
        range: { noDisabledRange: true },
        "multi-calendars": unref(isWideEnough) ? 2 : void 0,
        inline: "",
        "auto-apply": "",
        "enable-time-picker": false,
        key: unref(isWideEnough),
        highlight: unref(checkInOnly),
        "no-today": "",
        locale: "en-GB",
        "month-name-format": "long",
        "disabled-dates": unref(unavailableDates),
        "prevent-min-max-navigation": "",
        "min-date": /* @__PURE__ */ new Date(),
        "max-date": unref(maxDate),
        "month-change-on-scroll": false,
        onRangeStart: handleDateSelection
      }, null, _parent));
      _push(`</div><button class="clear-dates-btn" data-v-035ecb59>Clear Dates</button></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VueCalendar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const VueCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-035ecb59"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "GuestSelector",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const options = [
      { name: "Adults", description: "Ages 13 or above", key: "adults" },
      { name: "Children", description: "Ages 2\u201312", key: "children" },
      { name: "Infants", description: "Under 2", key: "infants" },
      { name: "Pets", description: "Not including service animals", key: "pets" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(options, (option) => {
        _push(`<div class="selector-row" data-v-485beec3><div class="info" data-v-485beec3><h4 data-v-485beec3>${ssrInterpolate(option.name)}</h4><p data-v-485beec3>${ssrInterpolate(option.description)}</p></div><div class="counter" data-v-485beec3><button data-v-485beec3>-</button><span data-v-485beec3>${ssrInterpolate(_ctx.modelValue[option.key])}</span><button data-v-485beec3>+</button></div></div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GuestSelector.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-485beec3"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReviewCard",
  __ssrInlineRender: true,
  props: {
    name: {},
    img_src: {},
    date: {},
    platform: {},
    review_content: {},
    rating: {}
  },
  setup(__props) {
    const review = __props;
    const expanded = ref(false);
    const showToggle = ref(false);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FontAwesomeIcon = resolveComponent("FontAwesomeIcon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))} data-v-b81ca1e0><div class="header" data-v-b81ca1e0><div class="header-info" data-v-b81ca1e0><h3 data-v-b81ca1e0>${ssrInterpolate(review.name)}</h3><div class="rating-row" data-v-b81ca1e0><!--[-->`);
      ssrRenderList(5, (n) => {
        _push(ssrRenderComponent(_component_FontAwesomeIcon, {
          style: { "color": "var(--accent-color)" },
          icon: "star",
          key: n
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div><div class="review-info" data-v-b81ca1e0><p data-v-b81ca1e0><span style="${ssrRenderStyle({ "color": "#444" })}" data-v-b81ca1e0>${ssrInterpolate(review.date)} \xB7 ${ssrInterpolate(review.platform)}</span></p><p class="${ssrRenderClass([{ "clamped": !unref(expanded) }, "review"])}" data-v-b81ca1e0>${ssrInterpolate(review.review_content)}</p>`);
      if (unref(showToggle)) {
        _push(`<button class="toggle-btn" data-v-b81ca1e0>${ssrInterpolate(unref(expanded) ? "Show less" : "Read more")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ReviewCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b81ca1e0"]]);
const cardWidth = 650 + 16;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ReviewCarousel",
  __ssrInlineRender: true,
  props: {
    propertyId: {}
  },
  async setup(__props) {
    let __temp, __restore;
    const state = reactive({
      reviews: [],
      isLoading: true
    });
    const props = __props;
    const endpoint = props.propertyId ? `https://az2zhr2dqyzfs3cjwc55p52yje0ncfyj.lambda-url.eu-north-1.on.aws/api_properties/${props.propertyId}/reviews` : "https://az2zhr2dqyzfs3cjwc55p52yje0ncfyj.lambda-url.eu-north-1.on.aws/api_properties/cfa6a066-72e8-4a24-a1e4-e48273983344/reviews";
    const { data: reviewsData, error } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `reviews-${props.propertyId || "all"}`,
      () => $fetch(endpoint)
    )), __temp = await __temp, __restore(), __temp);
    const currentIndex = ref(0);
    const len = computed(() => state.reviews.length);
    const carouselRef = ref(null);
    const extendedReviews = computed(() => [...state.reviews, ...state.reviews, ...state.reviews]);
    function scrollToIndex(idx) {
      if (!carouselRef.value) return;
      const scrollPos = (idx + len.value) * cardWidth - (carouselRef.value.clientWidth - cardWidth) / 2;
      carouselRef.value.scrollTo({ left: scrollPos, behavior: "smooth" });
    }
    watch(currentIndex, () => {
      scrollToIndex(currentIndex.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_ReviewCard = __nuxt_component_0;
      if ((_a = unref(reviewsData)) == null ? void 0 : _a.length) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-3973a53a>`);
        if (!unref(state).isLoading) {
          _push(`<div class="carousel-wrapper" data-v-3973a53a><button class="nav-btn prev" data-v-3973a53a>\u2039</button><div class="carousel" data-v-3973a53a><!--[-->`);
          ssrRenderList(unref(extendedReviews), (review, i) => {
            _push(`<div class="${ssrRenderClass([{ centered: i - unref(len) === unref(currentIndex) }, "carousel-card"])}" style="${ssrRenderStyle({
              transform: i - unref(len) === unref(currentIndex) ? "scale(1)" : "scale(0.65)",
              opacity: i - unref(len) === unref(currentIndex) ? 1 : 0.5,
              transition: "transform 0.3s ease, opacity 0.3s ease"
            })}" data-v-3973a53a>`);
            _push(ssrRenderComponent(_component_ReviewCard, mergeProps({ ref_for: true }, review), null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div><button class="nav-btn next" data-v-3973a53a>\u203A</button></div>`);
        } else {
          _push(`<div class="loading-text" data-v-3973a53a> Loading reviews... </div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<p${ssrRenderAttrs(_attrs)} data-v-3973a53a>No reviews yet for this property.</p>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ReviewCarousel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3973a53a"]]);
const usePropertyStore = defineStore("property", {
  state: () => ({
    properties: [],
    isLoaded: false,
    property_reviews: {},
    property_images: {},
    property_images_loading: {}
  }),
  actions: {
    async fetchProperties() {
      if (this.isLoaded) {
        return;
      }
      try {
        console.log("fetching properties from api gateway");
        const properties = await $fetch("https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties");
        this.properties = properties.map((el) => ({
          id: el.id,
          name: el.name,
          picture_url: el.picture_url,
          address: {
            street: el.address.street,
            city: el.address.city,
            state: el.address.state,
            country: el.address.country,
            postcode: el.address.postcode
          },
          amenities: el.amenities,
          description: el.description,
          summary: el.summary,
          capacity: {
            max: el.capacity.max,
            bedrooms: el.capacity.bedrooms,
            beds: el.capacity.beds,
            bathrooms: el.capacity.bathrooms
          },
          house_rules: {
            pets_allowed: el.house_rules.pets_allowed,
            smoking_allowed: el.house_rules.smoking_allowed,
            events_allowed: el.house_rules.events_allowed
          },
          details: {
            space_overview: el.details.space_overview,
            guest_access: el.details.guest_access,
            other_details: el.details.other_details,
            neighborhood_description: el.details.neighborhood_description,
            getting_around: el.details.getting_around
          }
        }));
        this.isLoaded = true;
      } catch (error) {
        console.error("Error fetching properties:", error);
        this.isLoaded = false;
      }
    },
    // use for later when reviews are set by Jaymi for the front page, use it the same on
    // the property page ([id].vue) as we do when loading properties on the index.vue.
    // we want to pass the values from pages to components, not fetch from components.
    // especially in onMounted calls, as it is not good for caching and server side rendering
    // for example, in ReviewCarousel.vue. we want the review data sent from the parents as we do 
    // properties from index.vue -> PropContainer.vue -> PropCard.vue
    async fetchReviews(propId) {
      if (this.property_reviews[propId]) {
        console.log("Returning cached property reviews");
        return;
      }
      console.log("fetching propery reviews from api gateway");
      const prop_reviews = await $fetch(`https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/${propId}/reviews`);
      this.property_reviews[propId] = prop_reviews.map((el) => ({
        name: el.name,
        img_src: el.img_src,
        date: el.date,
        platform: el.platform.charAt(0).toUpperCase() + el.platform.slice(1),
        review_content: el.review_content,
        rating: el.rating
      }));
    },
    async fetchImages(propId) {
      if (this.property_images[propId]) {
        console.log("Returning cached property images");
        return;
      }
      console.log("Fetching property images");
      this.property_images_loading[propId] = true;
      try {
        const images = await $fetch(`https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/${propId}/images`);
        this.property_images[propId] = images.map((img) => img.url);
      } catch (error) {
        console.error("Error fetching property images:", error);
      } finally {
        this.property_images_loading[propId] = false;
      }
    }
  }
});

export { VueCalendar as V, __nuxt_component_3 as _, __nuxt_component_0$1 as a, usePropertyStore as u };
//# sourceMappingURL=properties-CIZhV5Ne.mjs.map
