Class.create("DatePicker", {
    year: null,
    month: null,
    initailize: function(FormObject) {
        var date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth();
    },
    showDatePicker: function() {
        var datepicker = this.getDatePicker();
        $(document.body).down("#datepicker_div").observe('click', function(event) {
            $(document.body).down("#datepicker_div").insert(datepicker);
        });
        $(document.body).down("#datepicker_div").observe('mouseleave', function(event) {
            if ($(document.body).down("#datepicker_form")) {
                $(document.body).down("#datepicker_form").hide();
            }
        });
        $(document.body).down("#datepicker_div").observe('mouseenter', function(event) {
            if ($(document.body).down("#datepicker_form")) {
                $(document.body).down("#datepicker_form").show();
            }
        });

    },
    getDatePicker: function() {
        var date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth();

        var datePicker_div = new Element("div");
        datePicker_div.setAttribute("id", "datepicker_form");
        var monthBar = new Element("div");
        monthBar.setAttribute("id", "month_bar");
        datePicker_div.appendChild(monthBar);

        var previous = new Element("div");
        previous.setAttribute("id", "previous");
        monthBar.appendChild(previous);
        var previous_text = document.createTextNode("<<");
        previous.appendChild(previous_text);
        var getPreviousMonth = function(event) {
            this.month = this.month - 1;
            if (this.month < 0)
            {
                this.month = this.month + 12;
                this.year = this.year - 1;
            }
            $(document.body).down("#show_month_year").replace(this.showMonthYear(this.year, this.month));
            $(document.body).down("#selector_div").remove();
            var selector_div_previous = this.getSelector(this.year, this.month);
            selector_div_previous.setAttribute("id", "selector_div");
            $(document.body).down("#datepicker_form").appendChild(selector_div_previous);
        };
        previous.observe('click', getPreviousMonth.bind(this));
        monthBar.appendChild(this.showMonthYear(this.year, this.month));
        var next = new Element("div");
        next.setAttribute("id", "next");
        var getNextMonth = function(event) {
            this.month = this.month + 1;
            if (this.month > 11)
            {
                this.month = this.month - 12;
                this.year = this.year + 1;
            }
            $(document.body).down("#show_month_year").replace(this.showMonthYear(this.year, this.month));

            $(document.body).down("#selector_div").remove();
            var selector_div_next = this.getSelector(this.year, this.month);
            selector_div_next.setAttribute("id", "selector_div");
            $(document.body).down("#datepicker_form").appendChild(selector_div_next);
        };
        next.observe('click', getNextMonth.bind(this));
        monthBar.appendChild(next);
        var next_text = document.createTextNode(">>");
        next.appendChild(next_text);

        var selector_div = this.getSelector(this.year, this.month);
        selector_div.id = "selector_div";
        datePicker_div.appendChild(selector_div);
        return datePicker_div;
    },
    showMonthYear: function(year, month) {
        var show_month_year = new Element("div");
        show_month_year.setAttribute("id", "show_month_year");

        var mo_text = month + 1;
        if (mo_text < 10)
        {
            mo_text = "0" + mo_text;
        }
        var year_text = year;
        var mo = document.createTextNode(mo_text + "-" + year_text);
        show_month_year.appendChild(mo);
        return show_month_year;
    },
    getSelector: function(year, month) {
        var main_div = document.createElement("div");
        var main_table = document.createElement("table");
        main_div.appendChild(main_table);

        //get a start date using the first day of this month
        var firstDate = new Date(year, month, 1);

        //first line
        var show_date = 0;
        if (firstDate.getDay() > 0)
        {
            var tr1 = document.createElement("tr");
            main_table.appendChild(tr1);

            for (var i = 0; i < firstDate.getDay(); i++)
            {
                var td = document.createElement("td");
                tr1.appendChild(td);
                var text = document.createTextNode(" ");
                td.appendChild(text);
            }

            for (var i = firstDate.getDay(); i < 7; i++)
            {
                var td = document.createElement("td");
                td.setAttribute("id", this.formatDate(year, month + 1, show_date+1));
                td.setAttribute("class", "date_cell");
                    td.observe("click", function(event) {
                        var value = this.getAttribute("id");
                        $(document.body).down("#datepicker").setValue(value);
                    });
                tr1.appendChild(td);
                var text = document.createTextNode(show_date + 1);
                td.appendChild(text);
                show_date++;
            }
        }

        //get last date
        var last = this.getLastDate(year, month);

        //get other lines
        for (var i = show_date; i < last; i += 7)
        {
            var tr = document.createElement("tr");
            main_table.appendChild(tr);
            for (var j = 0; j < 7; j++) {
                if (i + j < last) {
                    var td = document.createElement("td");
                    td.setAttribute("id", this.formatDate(year, month + 1, i + j + 1));
                    td.setAttribute("class", "date_cell");
                    td.observe("click", function(event) {
                        var value = this.getAttribute("id");
                        $(document.body).down("#datepicker").setValue(value);
                    });
                    tr.appendChild(td);
                    var text = document.createTextNode(i + j + 1);
                    td.appendChild(text);
                }
            }
        }
        return main_div;

    },
    //formate the date to dd-mm-yyyy
    formatDate: function(year, month, date)
    {
        var fdate = "dd";
        var fmonth = "mm";
        var fyear = year;
        if (date > 9) {
            fdate = date;
        }
        else {
            fdate = "0" + date;
        }
        if (month > 9) {
            fmonth = month;
        }
        else {
            fmonth = "0" + month;
        }
        return fyear + "-" + fmonth + "-" + fdate;
    },
    getLastDate: function(year, month)
    {
        lastDate = new Date(year, month, 32);
        date = 32 - lastDate.getDate();
        return date;
    },
});